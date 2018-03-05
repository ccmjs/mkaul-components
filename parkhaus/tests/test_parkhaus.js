class Parkhaus {
  constructor(x,y){
    this._x = x;
    this._y = y;
    this._map = new Map();
    this._empty = '_';
  }
  index(i,j){
    return j*this._x + i;
  }
  getSlot(i,j){
    if (i>=this._x) throw new Error('x too large ' + i);
    if (j>=this._y) throw new Error('y too large ' + j);
    return this._map.get(this.index(i,j)) || this._empty;
  }
  setSlot(i,j,value){
    if (i>=this._x) throw new Error('x too large ' + i);
    if (j>=this._y) throw new Error('y too large ' + j);
    this._map.set(this.index(i,j), value);
  }
  toHTML(){
    let i,j,table;
    table = '<table>';
    for (i=0; i<this._x;i++){
      table += '<tr>';
      for (j=0; j<this._y;j++){
        table += '<td>' + this.getSlot(i,j) + '</td>';
      }
      table += '</tr>';
    }
    table += '</table>';
    return table;
  }
}

p = new Parkhaus(1,2);
p.setSlot(0, 0, "A");
p.setSlot(0, 1, "B");
p.setSlot(1, 1, "C");
console.log( p.toHTML() );