const {kafka} = require("./client");

async function init(){
    const admin = kafka.admin();
    await admin.connect();

    console.log("Connection to admin successful!!");

    await admin.createTopics({
        topics: [
            {
                topic: "on_publish",
                numPartitions: 2
            }
        ]
    });

    console.log("Topic [on_publish] created successfully");
    await admin.disconnect();

    console.log("Admin disconnected!");
}

init();