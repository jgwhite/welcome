export default function touch(path) {
  this.cwd()[path] = '';
}
