import React, {useEffect, useState} from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Button,
  TextField,
  Typography,
  Grid,
  FormLabel,
  FormControl,
} from '@material-ui/core';

import {
  Modal,
  Select,
  Stepper,
} from '../../../components';

import PropTypes from "prop-types";
import {bindActionCreators, Dispatch} from "redux";

import {connect} from "react-redux";
import {addAgency} from "../../../store/agencies/actions";
import {axios} from "../../../utils";

const propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  addAgency: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const AgencyAddModal: React.FC<Props> = ({ opened, onClose, onSuccess, addAgency }) => {
  const [step, setStep] = useState(0);
  const [suppliers, setSuppliers] = useState<
    {
      id: string | undefined,
      pcc: string | undefined
    }[]
  >([
    { id: undefined, pcc: undefined }
  ]);
  const [agencyName, setAgencyName] = useState('');
  const [apiUserName, setApiUserName] = useState('');
  const [apiPassword, setApiPassword] = useState('');
  const [adminID, setAdminID] = useState(undefined);
  const [adminOptions, setAdminOptions] = useState([]);
  const [errors, setErrors] = useState<{ password?: string, username?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [DataSourceOptions, setDataSourceOptions] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/teams/data_source/").then(({ data }) => {
      setDataSourceOptions(data.data.data_source.map((el: any) => ({
        value: el.id,
        label: el.provider,
      })))
    }).catch(console.error);
    axios.get("/api/v1/users/list/").then(({ data }) => {
      setAdminOptions(data.data.users.map((el: any) => ({
        value: el.user_id,
        label: el.username,
      })))
    }).catch(console.error);
  }, []);

  const handleClose = () => {
    setStep(0);
    setAgencyName('');
    setApiUserName('');
    setApiPassword('');
    setSuppliers([]);
    onClose();
  };

  const onAPIPasswordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setApiPassword(ev.target.value);

    if (isSubmitting) {
      if (!apiPassword) {
        setErrors({
          password: 'Empty APIPassword'
        })
      }
    }
  };

  const onAPIUserNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setApiUserName(ev.target.value);

    if (isSubmitting) {
      if (!apiUserName) {
        setErrors({
          username: 'Empty APIUserName'
        })
      }
    }
  };

  const onNext = () => {
    if (step === 1) {
      setIsSubmitting(true);
      if (apiUserName && apiPassword) {
        setIsSubmitting(false);
        setErrors({});
        return setStep(2);
      }
      else if (!apiPassword && !apiUserName) {
        setErrors({
          username: 'Empty APIUserName',
          password: 'Empty APIPassword'
        });
        return setStep(1)
      }
      else if (!apiPassword) {
        setErrors({
          password: 'Empty APIPassword'
        });
        return setStep(1)
      }
      else if (!apiUserName) {
        setErrors({
          username: 'Empty APIUserName'
        });
        return setStep(1)
      }
    }
    setStep(Math.min(step + 1, 3));
  };

  const onBack = () => {
    setStep(Math.max(step - 1, 0));
  };

  const onFinal = () => {
    addAgency({
      agency_name: agencyName,
      admin_id: adminID,
      api_username: apiUserName,
      api_password: apiPassword,
      data_source: suppliers
    }, onSuccess);
    handleClose();
  };

  const addSupplier = () => {
    setSuppliers([
      ...suppliers,
      { id: undefined, pcc: undefined }
    ])
  };

  const onChangeSupplier = (i: number, attr: 'id' | 'pcc', value: string) => {
    const s = [...suppliers];
    s[i][attr] = value;

    setSuppliers(s);
  };

  const renderStepContent = () => {
    if (step === 0) {
      return (
        <div className="first-step">
          <Typography variant="h3" component="h1" className="agency-form-title first-title">Create a new agency</Typography>
          <Grid container spacing={3} className="row">
            <Grid item xs={12}>
              <FormLabel className="label">Agency Name</FormLabel>
              <FormControl fullWidth>
                <TextField
                  placeholder="What should we call your agency"
                  value={agencyName}
                  variant="outlined"
                  onChange={(ev) => setAgencyName(ev.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormLabel className="label">Add Agency Admin</FormLabel>
              <FormControl fullWidth>
                <Select
                  className="select"
                  options={adminOptions}
                  value={adminID}
                  placeholder="Add Agency Admin"
                  onChange={setAdminID}
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      )
    } else if (step === 1) {
      return (
        <div className="second-step">
          <Grid container spacing={3} className="row">
            <Grid item sm={6} xs={12}>
              <FormLabel className="label">API Username</FormLabel>
              <FormControl fullWidth>
                <TextField
                  placeholder="API Username"
                  value={apiUserName}
                  error={isSubmitting && !!errors.username}
                  helperText={errors.username}
                  variant="outlined"
                  onChange={onAPIUserNameChange}
                />
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormLabel className="label">API Password</FormLabel>
              <FormControl fullWidth>
                <TextField
                  placeholder="API Password"
                  value={apiPassword}
                  error={isSubmitting && !!errors.password}
                  helperText={errors.password}
                  variant="outlined"
                  onChange={onAPIPasswordChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
      )
    } else if (step === 2) {
      return (
        <div className="third-step">
          {suppliers.map((el, idx) => (
            <Grid key={idx} container spacing={3} className="row">
              <Grid item sm={6} xs={12}>
                <FormLabel className="label">Supplier</FormLabel>
                <FormControl fullWidth>
                  <Select
                    className="select"
                    options={DataSourceOptions}
                    value={el.id}
                    placeholder="Select your data source"
                    onChange={(val) => onChangeSupplier(idx, "id", val)}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormLabel className="label">PCC/OID/ACCESS CREDS</FormLabel>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Your credentials"
                    value={el.pcc}
                    variant="outlined"
                    onChange={(ev) => onChangeSupplier(idx, 'pcc', ev.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
          ))}
          <Grid container spacing={3} className="row">
            <Grid item xs={12}>
              <Button size="small" color="secondary" className="btn-text" onClick={addSupplier}>+ Supplier</Button>
            </Grid>
          </Grid>
        </div>
      )
    }
    return (
      <div className="fourth-step">
        <Typography variant="h3" component="h1" className="agency-form-title">Create your Agency</Typography>
        <Typography className="agency-form-description">
          Once your agency is created it can be edited or archived anytime from the overview panel.
        </Typography>
      </div>
    )
  };

  return (
    <>
      <Modal
        className="agency-Accounts-Page-modal"
        title="Add Agency"
        opened={opened}
        onClose={handleClose}
      >
        <Stepper
          steps={["Create Agency", "Set API Creds", "Add Data Sources", "Finalize Settings"]}
          activeStep={step}
        >
          <PerfectScrollbar className="stepper-content">
            {renderStepContent()}
          </PerfectScrollbar>
          <div className="stepper-actions">
            <div className="stepper-actions-inner">
              {step > 0 && (
                <Button
                  variant="outlined"
                  className="btn-primary"
                  style={{ marginRight: 'auto' }}
                  onClick={onBack}
                >
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  variant="contained"
                  className="btn-filled"
                  style={{ marginLeft: 'auto' }}
                  onClick={onNext}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="btn-filled"
                  style={{ marginLeft: 'auto' }}
                  onClick={onFinal}
                >
                  Create Agency
                </Button>
              )}
            </div>
          </div>
        </Stepper>
      </Modal>
    </>
  )
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addAgency: bindActionCreators(addAgency, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(AgencyAddModal);
