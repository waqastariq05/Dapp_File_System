const hre = require("hardhat");

async function main() {
  const Drive = await hre.ethers.deployContract("Drive");

  await Drive.waitForDeployment();

  console.log(`ETH and deployed to ${Drive.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
