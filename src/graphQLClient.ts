import {GraphQLClient} from 'graphql-request'

const endpoint = 'https://test-323.herokuapp.com/v1/graphql'
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    // 😱
    authorization:
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1xTFFXMDlNTUxRMUNNZGJpV3cwSyJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6Imdvb2dsZS1vYXV0aDJ8MTA0NjY5NTI5OTM2OTYzOTk3MTIxIn0sImdpdmVuX25hbWUiOiJLYW1hbCIsImZhbWlseV9uYW1lIjoiTXVra2FtYWxhIiwibmlja25hbWUiOiJrYW1hbG5yZiIsIm5hbWUiOiJLYW1hbCBNdWtrYW1hbGEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2dEWkppTGk4UGJjMjY5MVpRcG55TmRmcUhyZmlwMFEyZEVXNkZicGJNPXM5Ni1jIiwibG9jYWxlIjoiZW4tR0IiLCJ1cGRhdGVkX2F0IjoiMjAyMS0wMi0yM1QyMDo0MzozMC41NjNaIiwiaXNzIjoiaHR0cHM6Ly90ZXN0LTMyMy51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDQ2Njk1Mjk5MzY5NjM5OTcxMjEiLCJhdWQiOiJNclVTM3NZTEpUU1paMzJpUjN4OUhwQWJ3MzlWVVJVaCIsImlhdCI6MTYxNDExMzAxMSwiZXhwIjoxNjE0MTQ5MDExLCJhdF9oYXNoIjoibnVqSnd0RVVSYzRCdFBiLWJxRmRlQSIsIm5vbmNlIjoiRW16TUk1ZnJwMGxKNX45b345Vm5JcnpZeFlscVg0aS0ifQ.aMQQAn_y8Wl2AzDfulVc-HG559zZJDcujaUiOupPfCeJ9z9qJEmNyuGmyR2s9PiJTtXsVL2zUfM7pzszLaabV5bKW_n1lp5FzAGKHpwgFySJCX981RhIcNas5eVtlPT6BfbC4qXGyTaym-0L1AIJdHhPHpTMJyV528ryPpi6iavEZoW2lF6xp3SEQedertFj6ILeOgllKeKIASgQlBQk74urlZ5pjI0NtftypFB8xD9LaeUlOmjoeVz1lVpIrVc-f7DpK1yArSXT88EU6Tzyk-0oGPEVPJOzzAx5uS8PGK6FZi9GApI025FUFfeAsSrfedxKtRoI_tQd86cE0UpLbw',
  },
})

export default graphQLClient