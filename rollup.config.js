import babel from 'rollup-plugin-babel'

export default {
  input: './src/main.js',
  output: {
    file: 'dist/vue.js',
    format: 'umd',
    name: 'Vue',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude:'node_modules/**'
    })
  ]
}