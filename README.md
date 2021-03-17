# Setting up with Google

1. Get your Google app client_id and client_secret at [the Google Cloud console](https://console.cloud.google.com/apis/credentials)
2. Save GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in `.env`-file


# Active Directory

1. Create your Active Directory Tenant as a new Active Directory in [the Azure portal](https://portal.azure.com/#create/Microsoft.AzureActiveDirectory)
2. Create an [App Registration](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps) in your new tenant. Be sure to select "Accounts in any organizational directory (Any Azure AD directory - Multitenant)" and answer to "Supported account types"
3. Save MICROSOFT_CLIENT_ID from Application (client) ID to `.env`-file
4. Add your callback URL under Authentication
5. Create a client secret under "Certificates and secrets" and save as MICROSOFT_CLIENT_SECRET in `.env`-file
