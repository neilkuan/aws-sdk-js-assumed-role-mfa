import readline from 'readline';
import AWS from 'aws-sdk';
import chalk from 'chalk';
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';
async function AWSSDKV2() {
  console.log('✅ ', 'AWSSDKV2...');
  const credentials = new AWS.SharedIniFileCredentials({
    profile: 'role-with-mfa',
    tokenCodeFn: async (mfaSerial, callback) => {
      console.log();
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question(
        chalk.yellowBright(
          `Please input MFA code for ${chalk.whiteBright(mfaSerial)}: `,
        ),
        (code) => {
          rl.close();
          callback(undefined, code);
        });
    },
  });
  const stsClient = new AWS.STS({
    credentials: credentials,
  });
  const sts = await stsClient.getCallerIdentity().promise();
  console.log(chalk.bgYellowBright(sts.Arn));
}
async function main() {
  await AWSSDKV2();
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();