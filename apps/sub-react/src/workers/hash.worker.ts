

if (self.crypto && self.crypto.subtle) {
  console.log('支持 WebCrypto API');
} else {
  throw new Error('当前环境不支持 WebCrypto API');
}

self.onmessage = async (e: MessageEvent) => {
  const { buffer } = e.data as { buffer: ArrayBuffer };
  
  try {
    const hashBuffer = await self.crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    self.postMessage({ type: 'success', hash: hashHex });
  } catch (err) {
    const error = err as Error;
    self.postMessage({ type: 'error', error: error.message });
  }
}; 