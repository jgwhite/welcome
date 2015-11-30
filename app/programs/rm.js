export default function rm(path) {
  delete this.cwd()[path];
}
