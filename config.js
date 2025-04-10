 module.exports = {
  token: process.env.TOKEN,
  prefix: "p!",
  server: "https://discord.gg/YUy6VP4VwV",

  yes: "✅",
  no: "❌",

  owners: ["931905398846410753", "828987913822928896","791609428961001492"],

  special: [""],

 mongo_atlas: {
    username: process.env.username,
    password: process.env.password,
    cluster: process.env.cluster,
    shard: {
      one: process.env.shard1,
      two: process.env.shard2,
      three: process.env.shard3
    }
  },
  webhooks: {
    cmd: {
      ID: process.env.webid,
      Token: process.env.webtoken,
    },
    guild: {
      ID: '1007543787758813256',
      Token: 'ZMhgi5nOITYJUScwMQqr4f388I9QvtlUnBM_RG9dXAB9HrpZSkxONwSeKwTHHPAffqK8'
    },
	vote: {
		ID: '',
		Token: ''
	}
  },
  cooldown: 100,
  
  topgg: {
	  auth: "",
	  token: ""
  }
};

