/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMember = /* GraphQL */ `
  subscription OnCreateMember {
    onCreateMember {
      id
      email
      firstName
      lastName
      biographgy
      managedUser
      dateOfBirth
      families {
        items {
          id
          familyID
          memberID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMember = /* GraphQL */ `
  subscription OnUpdateMember {
    onUpdateMember {
      id
      email
      firstName
      lastName
      biographgy
      managedUser
      dateOfBirth
      families {
        items {
          id
          familyID
          memberID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMember = /* GraphQL */ `
  subscription OnDeleteMember {
    onDeleteMember {
      id
      email
      firstName
      lastName
      biographgy
      managedUser
      dateOfBirth
      families {
        items {
          id
          familyID
          memberID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFamilyMember = /* GraphQL */ `
  subscription OnCreateFamilyMember {
    onCreateFamilyMember {
      id
      familyID
      memberID
      family {
        id
        name
        description
        members {
          nextToken
        }
        createdAt
        updatedAt
      }
      member {
        id
        email
        firstName
        lastName
        biographgy
        managedUser
        dateOfBirth
        families {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFamilyMember = /* GraphQL */ `
  subscription OnUpdateFamilyMember {
    onUpdateFamilyMember {
      id
      familyID
      memberID
      family {
        id
        name
        description
        members {
          nextToken
        }
        createdAt
        updatedAt
      }
      member {
        id
        email
        firstName
        lastName
        biographgy
        managedUser
        dateOfBirth
        families {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFamilyMember = /* GraphQL */ `
  subscription OnDeleteFamilyMember {
    onDeleteFamilyMember {
      id
      familyID
      memberID
      family {
        id
        name
        description
        members {
          nextToken
        }
        createdAt
        updatedAt
      }
      member {
        id
        email
        firstName
        lastName
        biographgy
        managedUser
        dateOfBirth
        families {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFamily = /* GraphQL */ `
  subscription OnCreateFamily {
    onCreateFamily {
      id
      name
      description
      members {
        items {
          id
          familyID
          memberID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFamily = /* GraphQL */ `
  subscription OnUpdateFamily {
    onUpdateFamily {
      id
      name
      description
      members {
        items {
          id
          familyID
          memberID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFamily = /* GraphQL */ `
  subscription OnDeleteFamily {
    onDeleteFamily {
      id
      name
      description
      members {
        items {
          id
          familyID
          memberID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
