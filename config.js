 module.exports = {
  token: process.env.TOKEN,
  prefix: "p!",
  server: "https://discord.gg/YUy6VP4VwV",

  yes: "✅",
  no: "❌",

  owners: ["931905398846410753", "828987913822928896", "984446125442474045",
"791609428961001492"],           

  special: ["665501328918970388", "545551162036977664", "953585429205102652","931905398846410753","791609428961001492"],

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
      ID: '980427208004861962',
      Token: '_jTWlJJspuly_GHqLoRgXCO4hH4eXTjqc--cx7luli2FxWbybtxkVgPoZHOGEalHGX09'
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

