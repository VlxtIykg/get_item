const NBT = require("mcnbt");
const nbt = new NBT();
const fetch = require("node-fetch");
const fs = require("fs");
const data = require("./profiles.json");

const checkExotic = async (uuid, apiKey) => {
  // For link
  // const data = await fetch(`https://api.hypixel.net/skyblock/profiles?key=${apiKey}&uuid=${uuid}`)
  // const response = await data.json();
  let parsedData = data;

  const nbted = (raw_data) => {
    const decode = Buffer.from(raw_data, "base64").toString("utf-8");
    const byte = Uint8Array.from(atob(raw_data), (c) => c.charCodeAt(0));

		let nbtData = "";
    nbt.loadFromZlibCompressedBuffer(byte, function (err) {
      if (err) {
        throw err;
      }
      nbtData = nbt;
      const tagcompound = nbtData.select("");
      tagcompound.value.i.value.forEach((element, index) => {
        if (element.value.tag?.value !== undefined) {
          console.log(element.value.tag.value.ExtraAttributes.value);
					fs.appendFileSync(
						"./inventory.json",
						JSON.stringify(element.value.tag.value.ExtraAttributes.value, null, 2),
						function (err) {
							if (err) {
								throw err;
							}
						}
					);
        }
				if (index === tagcompound.value.i.value.length - 1) {
					fs.appendFileSync("./inventory.json", "]")
					return
				}
				if (index !== tagcompound.value.i.value.length - 1 && element.value.tag?.value !== undefined) {
					fs.appendFileSync("./inventory.json", ", ");
				}
        /* let filter = Object.keys(extraTags).find((obj) => {
					return obj === "donated_museum";
				})
				console.log(filter); */
      });
    });
  };

  parsedData["profiles"].forEach((profile) => {
    // console.log();
    if (profile.members?.[uuid]["inv_contents"]?.["data"] !== undefined) {
			fs.writeFileSync("./inventory.json", "[")
      nbted(profile.members?.[`${uuid}`]["inv_contents"]?.["data"]);
    }
  });
};

checkExotic(
  "8ec9afdf83e54be8b414ed3f676cdbdb",
  "24e2a71e-cc48-4650-8583-dde375464b91"
);
