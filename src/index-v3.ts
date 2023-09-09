import readline from 'readline';
import { STSClient, GetCallerIdentityCommand } from '@aws-sdk/client-sts';
import { fromIni } from '@aws-sdk/credential-providers';
import chalk from 'chalk';
async function AWSSDKV3() {
  console.log('✅ ', 'AWSSDKV3...');
  const client = new STSClient({
    credentials: fromIni({
      profile: 'role-with-mfa',
      mfaCodeProvider: async (mfaSerial) => {
        console.log(chalk.yellowBright(`Please input MFA code for ${mfaSerial}`));
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        return new Promise((resolve) => {
          rl.question('Enter MFA code: ', (code) => {
            rl.close();
            resolve(code);
          });
        });
      },
    }),
  });
  const sts = await client.send(new GetCallerIdentityCommand({}));
  console.log(chalk.bgYellowBright(sts.Arn));
}
async function main() {
  await AWSSDKV3();
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();