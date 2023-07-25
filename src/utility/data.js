// [
  // {
  //   "mockRoles":
const role = [
    {
      "id": "2a3bged56e7f8g9h0i1j2k",
      "name": "CEO",
      "description": "Leads a specific team",
      "childrenId": [
        "2a3b4c5d6e7f8g9h0i1j2k",
        "3a4b5c6d7e8f9g0h1i2j3k"
      ],
      "hasAParent": false,
      "parentId": null,
      "employed": true,
      "employee": {
        "id": "5mqcmjhMZSopoTKwSkZFq",
        "name": "Derek Prince",
        "email": "abdi@tgmil.com",
        "gender": "Male",
        "dataOfBirth": "2023-07-03",
        "image": "",
        "phoneNumber": "+4325432534",
        "addedOn": "20/07/2023"
      }
    },
    {
      "id": "2a3b4c5d6e7f8g9h0i1j2k",
      "name": "COO",
      "description": "Leads a specific team",
      "childrenId": [
        "zG6I2zRzhRgRNh2uYG6qW",
        "u2VzU3CKKKbixGgzu6OGR",
        "uQnKjDy1Q1xeWA_zQOt1W"
      ],
      "hasAParent": true,
      "parentId": "1a2b3c4d5e6f7g8h9i0j1k",
      "employed": true,
      "employee": {
        "id": "5mqcmjhMZSosFTKwSkZFq",
        "name": "Abdi Megersa",
        "email": "abdi@tgmil.com",
        "gender": "Male",
        "dataOfBirth": "2023-07-03",
        "image": "",
        "phoneNumber": "+4325432534",
        "addedOn": "20/07/2023"
      }
    },
    {
      "id": "3a4b5c6d7e8f9g0h1i2j3k",
      "name": "CTO",
      "description": "Develops software applications",
      "childrenId": [
        "7a8b9c0d1e2f3g4h5i6j7k",
        "jp7imaa3hh42ciEvK8XAP"
      ],
      "hasAParent": true,
      "parentId": "1a2b3c4d5e6f7g8h9i0j1k",
      "employed": true,
      "employee": {
        "id": "6p8wq8n9zAneBfSu_SSUS",
        "name": "example name",
        "email": "ex@gmail.com",
        "gender": "Female",
        "dataOfBirth": "2023-07-03",
        "image": "",
        "phoneNumber": "+@345234",
        "addedOn": "19/07/2023"
      }
    },
    {
      "id": "7a8b9c0d1e2f3g4h5i6j7k",
      "name": "Database Administrator",
      "description": "Manages and maintains databases",
      "childrenId": [
        "HB81kfEWY9J2yrQxGAoeG"
      ],
      "hasAParent": true,
      "parentId": "3a4b5c6d7e8f9g0h1i2j3k",
      "employed": true,
      "employee": {
        "id": "Z9aEjv66nlpag2l0URmqX",
        "name": "David Broke",
        "email": "daveb@gmail.com",
        "gender": "Male",
        "dataOfBirth": "2023-07-18",
        "image": "",
        "phoneNumber": "364563456",
        "addedOn": "19/07/2023"
      }
    },
    {
      "id": "jp7imaa3hh42ciEvK8XAP",
      "name": "Senior Developer",
      "description": "exmple dev chidren",
      "childrenId": [
        "WMlQ6g5-lXZ3fF7zngrVJ"
      ],
      "hasAParent": true,
      "parentId": "3a4b5c6d7e8f9g0h1i2j3k",
      "employed": true,
      "employee": {
        "id": "ep9b0c1d2e3f4g5h6i7j06",
        "name": "Emily Davis test",
        "email": "emilydavis@example.com",
        "gender": "Female",
        "dateOfBirth": "1992-09-10",
        "image": "https://example.com/emilydavis.jpg",
        "phoneNumber": "0123456734534",
        "addedOn": "2022-05-01"
      }
    },
    {
      "id": "HB81kfEWY9J2yrQxGAoeG",
      "name": "Junior Developer",
      "description": "A Entry level developer handling the minor tasks",
      "childrenId": [],
      "hasAParent": true,
      "parentId": "7a8b9c0d1e2f3g4h5i6j7k",
      "employed": false,
      "employee": null
    },
    {
      "id": "u2VzU3CKKKbixGgzu6OGR",
      "name": "Test role",
      "description": "test under hrm",
      "childrenId": [],
      "hasAParent": true,
      "parentId": "5a6b7c8d9e0f1g2h3i4j5k",
      "employed": false,
      "employee": null
    },
    {
      "id": "zG6I2zRzhRgRNh2uYG6qW",
      "name": "Advisor ",
      "description": "Provides necessary information to the human resource manager\n",
      "childrenId": [
        "fijpbHo_hpnCu4BbZE1-J"
      ],
      "hasAParent": true,
      "parentId": "4a5b6c7d8e9f0g1h2i3j4k",
      "employed": true,
      "employee": {
        "id": "eH5INLqET3C_WYB-yKAAv",
        "name": "Killer Frost",
        "email": "abdi@gmail.com",
        "gender": "Male","dataOfBirth": "2023-06-26",
        "image": "",
        "phoneNumber": "+234523452435",
        "addedOn": "20/07/2023"
      }
    },
    {
      "id": "fijpbHo_hpnCu4BbZE1-J",
      "name": "Intern",
      "description": "In Training ",
      "childrenId": [],
      "hasAParent": true,
      "parentId": "zG6I2zRzhRgRNh2uYG6qW",
      "employed": false,
      "employee": null
    },
    {
      "id": "uQnKjDy1Q1xeWA_zQOt1W",
      "name": "test new Role",
      "description": "test role",
      "childrenId": [],
      "hasAParent": true,
      "parentId": "5a6b7c8d9e0f1g2h3i4j5k",
      "employed": false,
      "employee": null
    },
    {
      "id": "WMlQ6g5-lXZ3fF7zngrVJ",
      "name": "ujtyrtrgtrgt",
      "description": "dgbrhrgr",
      "childrenId": [],
      "hasAParent": true,
      "parentId": "jp7imaa3hh42ciEvK8XAP",
      "employed": true,
      "employee": {
        "id": "yGuDo37sLs7ckvEGx0NzF",
        "name": "mercy",
        "email": "wewe@tdt.com",
        "gender": "Female",
        "dataOfBirth": "2023-06-29",
        "image": "",
        "phoneNumber": "987654567656",
        "addedOn": "24/07/2023"
      }
    }
  ]