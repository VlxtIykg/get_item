const NBT = require('mcnbt');
const nbt = new NBT();
const fetch = require("node-fetch");
const fs = require("fs");
const data = require("./profiles.json")

const checkExotic = async (uuid, apiKey) => {
		// For link
    // const data = await fetch(`https://api.hypixel.net/skyblock/profiles?key=${apiKey}&uuid=${uuid}`)
    // const response = await data.json();
		let parsedData = data;

    const nbted = (raw_data) => {
        const decode = Buffer.from(raw_data, 'base64').toString('utf-8');
        const byte = Uint8Array.from(atob(raw_data), c => c.charCodeAt(0));
        // console.log();
        let nbtData = "";
        nbt.loadFromZlibCompressedBuffer(byte, function(err) {
            if(err) {throw err;}
            nbtData = nbt;
            const tagcompound = nbtData.select("");
            tagcompound.value.i.value.forEach(element => {
                // const extraTags = element.value.tag?.value?.ExtraAttributes.value?.donated_museum;
								if (element.value.tag?.value !== undefined) {
									console.log(element.value.tag.value.ExtraAttributes.value);
								}
                /* let filter = Object.keys(extraTags).find((obj) => {
                    return obj === "donated_museum";
                })
                console.log(filter); */
            })
        })
    }
    
    parsedData["profiles"].forEach(profile => {
        // console.log();
        if(profile.members?.[uuid]["inv_contents"]?.["data"] !== undefined) {
            nbted(profile.members?.[`${uuid}`]["inv_contents"]?.["data"])
            fs.writeFile("./armordata.json", JSON.stringify(profile.members?.[`${uuid}`]["inv_contents"], null, 2), function(err) {
                if(err) {throw err;}
        })
    }
    });
}

checkExotic("8ec9afdf83e54be8b414ed3f676cdbdb", "24e2a71e-cc48-4650-8583-dde375464b91")