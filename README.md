## Using the shared credentials file
> This provider is checked by default in the Node.js environment. To use the credentials file provider, simply add your access and secret keys to the ~/.aws/credentials file in the following format:
`~/.aws/credentials`
```ini
[default]
aws_access_key_id=foo
aws_secret_access_key=bar
```

`~/.aws/config`
```ini
[default]
region = us-east-1
output = json


[profile role-with-mfa]
role_arn = arn:aws:iam::123456789012:role/the-assumed-role
source_profile = neil
mfa_serial = aarn:aws:iam::123456789012:mfa/cli-user
```

## The `trust_relationships` of `the-assumed-role`
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::123456789012:root"
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "BoolIfExists": {
                    "aws:MultiFactorAuthPresent": [
                        "true"
                    ]
                }
            }
        }
    ]
}
```

## Example use AWS SDK V2 assumed role
[source code](./src/index-v2.ts)
Example output
```bash
pj run-sdk-v2

👾 run-sdk-v2 | AWS_SDK_LOAD_CONFIG=1 ts-node src/index-v2.ts
✅  AWSSDKV2...

Please input MFA code for arn:aws:iam::123456789012:mfa/cli-user: xxxxxx 
arn:aws:sts::123456789012:assumed-role/the-assumed-role/aws-sdk-js-1694231277404
```

## Example use AWS SDK V3 assumed role
[source code](./src/index-v3.ts)
Example output
```bash
pj run-sdk-v3
👾 run-sdk-v3 | AWS_SDK_LOAD_CONFIG=1 ts-node src/index-v3.ts
✅  AWSSDKV3...
Please input MFA code for arn:aws:iam::123456789012:mfa/cli-user
Enter MFA code: xxxxxx 
arn:aws:sts::123456789012:assumed-role/the-assumed-role/aws-sdk-js-1694231277404
```


## Ref:
- https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-credential-providers/#fromini
- https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SharedIniFileCredentials.html