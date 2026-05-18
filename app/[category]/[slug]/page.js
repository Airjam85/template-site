export default function Page(props) {
  console.log("PROPS:", props);

  return (
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
  );
}