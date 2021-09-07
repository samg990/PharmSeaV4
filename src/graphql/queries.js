/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMedication = /* GraphQL */ `
  query GetMedication($id: ID!) {
    getMedication(id: $id) {
      id
      name
      brandName
      genericName
      dose
      userId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listMedications = /* GraphQL */ `
  query ListMedications(
    $filter: ModelMedicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        brandName
        genericName
        dose
        userId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
