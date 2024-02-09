class Triangle {
  getArea() {
    const { a, b, c } = this;
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }
  display() {
    console.log(`I am a triangle with sides ${a}, ${b}, and ${c}.`);
  }
}

// end
