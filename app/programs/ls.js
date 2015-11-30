export default function ls() {
  return Object.keys(this.cwd()).join('\n');
}
