export const downloadImage = (images) => {
  images.forEach(([view, dataUrl]) => {
    const link = document.createElement('a');
    link.download = `${view}_customized.png`;
    link.href = dataUrl;
    link.click();
  });
};
