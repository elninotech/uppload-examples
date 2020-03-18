import { Uppload, en, Local, Instagram } from "uppload";

const uploader = new Uppload({
  lang: en,
  call: ".pure-button-primary"
});

uploader.use([new Local(), new Instagram()]);
uploader.on("*", (...params: any[]) => {
  console.log(params);
});

console.log(uploader);
