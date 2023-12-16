function Hello(props) {
  return <p>Hi {props.to} from {props.from}</p>;
}

Hello.defaultProps = {
  from: "Joel"
};
