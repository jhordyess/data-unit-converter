import Calculator from '@/components/Calculator'

export default function Home() {
  return (
    <div className="container">
      <h2>Data unit converter</h2>

      <Calculator />

      <footer>
        Made with 💪 by&nbsp;
        <a href="https://www.jhordyess.com" target="_blank">
          Jhordyess
        </a>
        <br />
        <a href="https://github.com/jhordyess/data-unit-converter" target="_blank">
          👉 View on GitHub
        </a>
      </footer>
    </div>
  )
}
