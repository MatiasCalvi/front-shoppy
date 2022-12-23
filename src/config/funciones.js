function separator(numb) {
  if (numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.join(".");
  }
}

const funciones = {
  separator,
};

export default funciones;
