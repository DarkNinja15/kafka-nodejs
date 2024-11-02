const {kafka} = require("./client");
const group = process.argv[2];

async function init(){
    const consumer = kafka.consumer({groupId:group});
    await consumer.connect();

    consumer.subscribe({topics:["on_publish"],fromBeginning:true});

    await consumer.run({
        eachMessage: async ({topic,partition,message,hearbeat,pause}) => {
            console.log(
                `${group} ${topic} ${partition} ${message.value.toString()}`
            );
        }
    });
}


init();