export const conversation = {
  otherUser: {
    profilePic:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/775db5e79c5294846949f1f55059b53317f51e30_s3back.png",
    username: "santiago",
    id: 1
  }
};

export const currentUser = {
  username: "thomas",
  profilePic:
    "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914467/messenger/thomas_kwzerk.png",
  id: 1
};

export const conversations = [
  {
    id: 1,
    user1: {
      id: 10,
      username: "santiago",
      profilePic:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/775db5e79c5294846949f1f55059b53317f51e30_s3back.png"
    },
    unread: [],
    latestMessageText: "hi",
    typing: true
  },
  {
    id: 2,
    user2: {
      id: 20,
      username: "chiumbo",
      profilePic:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914468/messenger/8bc2e13b8ab74765fd57f0880f318eed1c3fb001_fownwt.png"
    },
    unread: [{}],
    latestMessageText: "Sure! What time?"
  },
  {
    id: 3,
    user1: {
      id: 30,
      username: "hualing",
      profilePic:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/6c4faa7d65bc24221c3d369a8889928158daede4_vk5tyg.png"
    },
    unread: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    latestMessageText: "😂 😂 😂"
  },
  {
    id: 4,
    user2: {
      id: 40,
      username: "ashanti",
      profilePic:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/68f55f7799df6c8078a874cfe0a61a5e6e9e1687_e3kxp2.png"
    },
    unread: [],
    latestMessageText: "hey"
  },
  {
    id: 5,
    user1: {
      id: 50,
      username: "julia",
      profilePic:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914468/messenger/d9fc84a0d1d545d77e78aaad39c20c11d3355074_ed5gvz.png"
    },
    unread: [],
    latestMessageText: "Do you have any plans?"
  },
  {
    id: 6,
    user1: {
      id: 60,
      username: "cheng",
      profilePic:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/9e2972c07afac45a8b03f5be3d0a796abe2e566e_ttq23y.png"
    },
    unread: [],
    latestMessageText: "What's up"
  }
];

export const messages = [
  {
    text: "Where are you from?",
    datePlaceholder: "10:45",
    senderId: 10,
    id: 10
  },
  {
    text: "I'm from New York",
    datePlaceholder: "10:51",
    senderId: 1,
    id: 11
  },
  { text: "Share photo of your city, please", datePlaceholder: "10:55", senderId: 10, id: 12 }
];
