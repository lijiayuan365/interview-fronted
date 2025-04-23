import { createFileRoute } from '@tanstack/react-router';
import { ContentType, upload } from '@ljy/api-client';
import { useState } from 'react';
import to from 'await-to-js';
import {
  Button,
  Upload,
  Progress,
  message,
  Typography,
  Card,
  Space,
  Divider,
} from 'antd';
import { UploadOutlined, FileOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import { calculateFileHash, calculateBufferHash } from '../../utils';
export const Route = createFileRoute('/big-file/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [messageApi, contextHolder] = message.useMessage();

  // 文件相关状态和处理方法
  const [file, setFile] = useState<RcFile | null>(null);
  const [fileHash, setFileHash] = useState('');
  const [hashLoading, setHashLoading] = useState(false);
  
  // // 计算文件哈希
  // const calculateHash = async (file: RcFile): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
      
  //     reader.onload = async (e) => {
  //       try {
  //         const buffer = e.target?.result as ArrayBuffer;
  //         // 在 Worker 中进行计算，避免阻塞主线程
  //         const hashWorker = new Worker(new URL('../../workers/hash.worker.ts', import.meta.url));
          
  //         hashWorker.onmessage = (e) => {
  //           const { type, hash, error } = e.data;
  //           hashWorker.terminate();
            
  //           if (type === 'error') {
  //             reject(new Error(error));
  //           } else {
  //             resolve(hash);
  //           }
  //         };
  //         hashWorker.postMessage({ buffer });
  //       } catch (error) {
  //         reject(error);
  //       }
  //     };

  //     reader.onprogress = (event) => {
  //       if (event.lengthComputable) {
  //         // console.log(event.loaded, event.total);
  //         // 将文件读取进度
  //       }
  //     };

  //     reader.onerror = () => {
  //       reject(new Error('文件读取失败'));
  //     };

  //     reader.readAsArrayBuffer(file);
  //   });
  // };

  // 处理文件选择
  const handleFileChange: UploadProps['onChange'] = async (info) => {
    const newFile = info.file as RcFile;
    if (newFile) {
      setFile(newFile);
      setProgress(0);
      setUploadId('');
      setUploadedChunks([]);

      // 计算文件哈希
      messageApi.loading({ content: '正在计算文件哈希...', key: 'hashCalculation' });
        setHashLoading(true);
        const [err, hash] = await to(calculateFileHash(newFile));
        setHashLoading(false);
        if (err) return messageApi.error({ content: '文件哈希计算失败', key: 'hashCalculation' });
        setFileHash(hash);
        messageApi.success({ content: '文件哈希计算完成', key: 'hashCalculation' });
    }
  };

  // 上传进度和状态相关
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // 分片上传相关状态和处理方法
  const [uploadId, setUploadId] = useState<string>('');
  const [uploadedChunks, setUploadedChunks] = useState<number[]>([]);
  const [chunkSize, setChunkSize] = useState(1024 * 1024); // 默认1MB

  // 初始化上传
  const initUpload = async () => {
    if (!file || !fileHash) {
      messageApi.error('请先选择文件');
      return;
    }
    setUploading(true);
    const [err, data] = await upload.uploadControllerInit({
      fileName: file.name,
      fileSize: file.size,
      fileHash: fileHash,
    });
    setUploading(false);
    if (err || !data) {
      console.error('初始化上传失败:', err);
      messageApi.error('初始化上传失败');
      return;
    }
    setUploadId(data.uploadId);
    setUploadedChunks(data.uploadedChunks);
    setChunkSize(data.chunkSize);
    // 计算分片总数
    const chunks = Math.ceil(file.size / data.chunkSize);
    // 更新进度
    if (data.uploadedChunks.length > 0) {
      const progress = Math.floor((data.uploadedChunks.length / chunks) * 100);
      setProgress(progress);
      messageApi.success(`检测到未完成的上传，已完成 ${progress}%`);
    } else {
      messageApi.success('上传初始化成功');
    }
  };

  // 分片上传
  const uploadChunks = async () => {
    if (!file || !uploadId) {
      messageApi.error('请先初始化上传');
      return;
    }

    const chunks = Math.ceil(file.size / chunkSize);

    // 已上传的分片索引集合
    const uploadedChunksSet = new Set(uploadedChunks);

    for (let i = 0; i < chunks; i++) {
      // 跳过已上传的分片
      if (uploadedChunksSet.has(i)) {
        continue;
      }

      const start = i * chunkSize;
      const end = Math.min(file.size, start + chunkSize);
      const chunk = file.slice(start, end);

      // 计算分片哈希
      const chunkArrayBuffer = await chunk.arrayBuffer();
      const [chunkErr, chunkHash] = await to(calculateBufferHash(chunkArrayBuffer));
      if (chunkErr) return messageApi.error('分片哈希计算失败');
      // 创建FormData
      const formData = new FormData();
      formData.append('file', chunk);
      formData.append('x-upload-id', uploadId);
      formData.append('x-chunk-index', i.toString());
      formData.append('x-chunk-hash', chunkHash);
      // 上传分片
      const [err, result] = await upload.uploadControllerUploadChunk({
        body: formData,
        type: ContentType.FormData,
        headers: {
          'x-upload-id': uploadId,
          'x-chunk-index': i.toString(), // 转换为字符串
          'x-chunk-hash': chunkHash,
        },
      });
      if (err || !result) {
        messageApi.error('上传分片失败');
        return;
      }
      if (result.success) {
        uploadedChunksSet.add(i);
        setUploadedChunks(Array.from(uploadedChunksSet));

        // 更新进度
        const progress = Math.floor((uploadedChunksSet.size / chunks) * 100);
        setProgress(progress);

        if (result.isComplete) {
          messageApi.success('所有分片上传完成，请点击"合并分片"完成上传');
          break;
        }
      }
    }
  };

  // 检查上传状态
  const checkStatus = async () => {
    if (!uploadId) {
      messageApi.error('请先初始化上传');
      return;
    }
    const [err, data] = await upload.uploadControllerCheckStatus(uploadId);
    if (err || !data) {
      messageApi.error('检查上传状态失败');
      return;
    }
    const { isComplete, uploadedChunksCount, totalChunks, missingChunks } =
      data;
    setUploadedChunks(
      Array.from({ length: totalChunks }, (_, i) =>
        missingChunks.includes(i) ? -1 : i
      ).filter((i) => i !== -1) as number[]
    );

    const progress = Math.floor((uploadedChunksCount / totalChunks) * 100);
    setProgress(progress);

    if (isComplete) {
      messageApi.success('所有分片已上传完成，请点击"合并分片"完成上传');
    } else {
      messageApi.info(
        `已上传 ${uploadedChunksCount}/${totalChunks} 个分片，完成度 ${progress}%`
      );
    }
  };

  // 合并分片
  const mergeChunks = async () => {
    if (!uploadId) {
      messageApi.error('请先初始化上传');
      return;
    }
    const [err, result] = await upload.uploadControllerMerge({
      uploadId,
    });
    if (err || !result) {
      messageApi.error('合并分片失败');
      return;
    }
    if (result.success) {
      messageApi.success('文件上传成功');
    } else {
      messageApi.error('文件合并失败');
    }
  };

  // 重置状态
  const reset = () => {
    setUploading(false);
    setFile(null);
    setUploadId('');
    setProgress(0);
    setUploadedChunks([]);
    setFileHash('');
  };

  // Upload组件配置
  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      setFile(file as RcFile);
      return false;
    },
    onChange: handleFileChange,
    maxCount: 1,
    showUploadList: false,
  };

  return (
    <div>
      {contextHolder}
      <Typography.Title level={3}>大文件分片上传</Typography.Title>

      <Card>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Space align='start'>
            <Upload {...uploadProps}>
              <Button loading={hashLoading} icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
            <div>
              {file && (
                <div>
                  <Typography.Text strong>
                    <FileOutlined /> {file.name}
                  </Typography.Text>
                  <div>
                    <Typography.Text type='secondary'>
                      大小: {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </Typography.Text>
                  </div>
                </div>
              )}
            </div>
          </Space>
          <Divider />

          <Space direction='vertical' style={{ width: '100%' }}>
            <Progress
              percent={progress}
              status={progress === 100 ? 'success' : 'active'}
            />

            <Space>
              <Button
                type='primary'
                onClick={initUpload}
                disabled={!file || uploading}
              >
                初始化上传
              </Button>
              <Button
                onClick={uploadChunks}
                disabled={!uploadId || progress === 100}
              >
                上传分片
              </Button>
              <Button onClick={checkStatus} disabled={!uploadId}>
                检查状态
              </Button>
              <Button
                type='primary'
                onClick={mergeChunks}
                disabled={!uploadId || progress < 100}
              >
                合并分片
              </Button>
              <Button onClick={reset}>重置</Button>
            </Space>
          </Space>
        </Space>
      </Card>
    </div>
  );
}
