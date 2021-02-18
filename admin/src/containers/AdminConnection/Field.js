import { connect } from 'react-redux';
import Field from '../../components/AdminConnection/Field';
//import { changeInputValue } from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  currentValue: state[ownProps.name],
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Field);
