type AppProps = {
    title: string;
}

const App = ({ title }: AppProps ) =>
    <div className="font-bold">{title}</div>;

export default App;