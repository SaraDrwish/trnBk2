import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCustomerProviders } from '../store/actions/customerProviderActions';

const CustomerProviderPage = ({ customerProviders, fetchCustomerProviders }) => {
  useEffect(() => {
    fetchCustomerProviders();
  }, [fetchCustomerProviders]);

  return (
    <div>
      <h1>Customer Provider Page</h1>
      {customerProviders.map((customerProvider) => (
        <div key={customerProvider._id}>
          <p>{customerProvider.customerId}</p>
          <p>{customerProvider.status}</p>
         </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    customerProviders: state.customerProvider.customerProviders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCustomerProviders: () => dispatch(fetchCustomerProviders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProviderPage);
