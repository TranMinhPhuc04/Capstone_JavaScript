export default class Phone {
  constructor(
      id,
      name,
      price,
      screen,
      backCam,
      frontCam,
      img,
      desc,
      type
  ) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.screen = screen;
      this.backCam = backCam;
      this.frontCam = frontCam;
      this.img = img;
      this.desc = desc;
      this.type = type;
  }
}
