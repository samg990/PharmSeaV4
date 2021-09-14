/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMedication = /* GraphQL */ `
  mutation CreateMedication(
    $input: CreateMedicationInput!
    $condition: ModelMedicationConditionInput
  ) {
    createMedication(input: $input, condition: $condition) {
      id
      name
      brandName
      genericName
      dose
      userId
      userName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateMedication = /* GraphQL */ `
  mutation UpdateMedication(
    $input: UpdateMedicationInput!
    $condition: ModelMedicationConditionInput
  ) {
    updateMedication(input: $input, condition: $condition) {
      id
      name
      brandName
      genericName
      dose
      userId
      userName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteMedication = /* GraphQL */ `
  mutation DeleteMedication(
    $input: DeleteMedicationInput!
    $condition: ModelMedicationConditionInput
  ) {
    deleteMedication(input: $input, condition: $condition) {
      id
      name
      brandName
      genericName
      dose
      userId
      userName
      createdAt
      updatedAt
      owner
    }
  }
`;
