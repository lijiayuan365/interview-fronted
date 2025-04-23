import type { RcFile } from 'antd/es/upload/interface';
import to from 'await-to-js';

/**
 * 计算文件哈希
 * @param file 文件
 * @returns 文件哈希
 */
export const calculateFileHash = async (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      const [err, hash] = await to(calculateBufferHash(buffer));
      if (err) return reject(err);
      resolve(hash);
    };

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        // console.log(event.loaded, event.total);
        // 将文件读取进度
      }
    };

    reader.onerror = () => {
      reject(new Error('文件读取失败'));
    };

    reader.readAsArrayBuffer(file);
  });
};

export const calculateBufferHash = async (buffer: ArrayBuffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const hashWorker = new Worker(new URL('../workers/hash.worker.ts', import.meta.url));
    hashWorker.onmessage = (e) => {
      const { type, hash, error } = e.data;
      hashWorker.terminate();
      if (type === 'error') {
        reject(new Error(error));
      } else {
        resolve(hash);
      }
    };
    hashWorker.postMessage({ buffer });
  });
};
