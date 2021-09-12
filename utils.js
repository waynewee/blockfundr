export const weiToEther = (amountInWei) => {
  return (amountInWei / 10 ** 18).toFixed(3);
};
