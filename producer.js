const {kafka} = require("./client");
const readline = require("readline");

const rl = readline.createInterface(
    process.stdin, process.stdout
);

async function init(){
    const producer = kafka.producer();
    await producer.connect();

    rl.setPrompt('>');
    rl.prompt();
    rl.on('line', async (args) => {
        const [name,loc] = args.split(" ");
        console.log(name + loc);
        await producer.send({
            topic: "on_publish",
            messages: [
                {
                    partition: loc.toLowerCase() === "north" ? 0:1,
                    value: JSON.stringify({name,loc})
                }
            ]
        });
    }).on("close",async ()=>{
        await producer.disconnect();
    });
}

init();