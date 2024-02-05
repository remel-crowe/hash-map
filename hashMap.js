class Node {
  constructor(key, value = null) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor() {
    this.buckets = new Array(16).fill(null);
    this.loadFactor = 0.75;
    this.size = 0;
  }

  checker(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 7;
    for (let i = 0; i < key.length; i++) {
      hashCode += primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.buckets.length;
  }

  set(key, value) {
    let index = this.hash(key);
    this.checker(index);
    if (this.size / this.buckets.length < this.load) {
      let newArr = Array(this.buckets.length * 2);
      for (let node of this.buckets) {
        if (node) {
          const { key, value } = node;
          let index = this.hash(key);
          newArr[index] = { key, value };
        }
      }
      this.buckets = newArr;
    }
    if (!this.buckets[index]) {
      this.size += 1;
      return (this.buckets[index] = new Node(key, value));
    }
    return (this.buckets[index] = new Node(key, value));
  }

  get(key) {
    let index = this.hash(key);
    if (this.buckets[index]) {
      return this.buckets[index].value;
    }
    return null;
  }

  has(key) {
    let index = this.hash(key);
    for (let i = 0; i < this.loadFactor; i++) {
      if (this.buckets[index]) {
        return true;
      }
      return false;
    }
  }

  remove(key) {
    let index = this.hash(key);
    if (this.buckets[index]) {
      this.buckets[index] = null;
      this.size -= 1;
      return true;
    }
    return "Nothing to remove", false;
  }

  length() {
    return this.size;
  }

  keys() {
    let keyArr = [];
    this.buckets.map((bucket) => {
      if (bucket) {
        keyArr.push(bucket);
      }
    });
    return keyArr;
  }

  values() {
    let valueArr = [];
    this.buckets.forEach((bucket) => {
      if (bucket) {
        valueArr.push(bucket.value);
      }
    });
    return valueArr;
  }
}

let Hash = new HashMap();

Hash.set("Remel", "King");
Hash.set("Remel2", "King2");
Hash.set("rem3", "random");

console.log(Hash.keys());
