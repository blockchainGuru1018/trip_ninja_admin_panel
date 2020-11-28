import React, { useState } from 'react';
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
  Drawer,
  Modal,
  Select,
  Stepper,
  Tabs,
  UsernameField
} from '../../components';

import PropTypes from "prop-types";

const propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const AgencyAddModal: React.FC<Props> = ({ opened, onClose }) => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [step, setStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [suppliers, setSuppliers] = useState([
    { supplier: '', credential: '' }
  ]);

  const onNext = () => {
    setStep(Math.min(step + 1, 3));
  };

  const onBack = () => {
    setStep(Math.max(step - 1, 0));
  };

  const onFinal = () => {
    onClose();
    setDrawerOpened(true);
  };

  const addSupplier = () => {
    setSuppliers([
      ...suppliers,
      { supplier: '', credential: '' }
    ])
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
                <TextField type="agency_name" placeholder="What should we call your agency" variant="outlined" />
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
                <TextField type="api_username" placeholder="API Username" variant="outlined" />
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormLabel className="label">API Password</FormLabel>
              <FormControl fullWidth>
                <TextField type="api_password" placeholder="API Password" variant="outlined" />
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
                    options={[
                      { value: 'regina_george', label: 'Regina George' },
                      { value: 'augustus', label: 'Augustus' },
                      { value: 'selena_gomez', label: 'Selena Gomez' },
                      { value: 'augustus', label: 'Augustus' },
                    ]}
                    value="regina_george"
                    placeholder="Select your data source"
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormLabel className="label">PCC/OID/ACCESS CREDS</FormLabel>
                <FormControl fullWidth>
                  <TextField type="credentials" placeholder="Your credentials" variant="outlined" />
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
        className="agencyAccounts__Page__modal"
        title="Add Agency"
        opened={opened}
        onClose={onClose}
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

      <Drawer
        className="agencyAccounts__Page__modal"
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
      >
        <Drawer.Header>
          <UsernameField value="Agency Name" onChange={console.log} />
        </Drawer.Header>
        <PerfectScrollbar>
          <Drawer.Body>
            <Grid item xs={12}>
              <Tabs
                value={activeTab}
                tabs={["API Credentials", "Data Sources"]}
                onChange={(event: React.ChangeEvent<{}>, newValue: any) => setActiveTab(newValue)}
                style={{ marginBottom: 30 }}
              />
              {activeTab === 0 ? (
                <Grid container spacing={3} className="row">
                  <Grid item sm={6} xs={12}>
                    <FormLabel className="label">API Username</FormLabel>
                    <FormControl>
                      <TextField type="api_username" placeholder="API Username" variant="outlined" />
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormLabel className="label">API Password</FormLabel>
                    <FormControl>
                      <TextField type="api_password" placeholder="API Password" variant="outlined" />
                    </FormControl>
                  </Grid>
                </Grid>
              ) : (
                <div>
                  {suppliers.map((el, idx) => (
                    <Grid key={idx} container spacing={3} className="row">
                      <Grid item sm={6} xs={12}>
                        <FormLabel className="label">Supplier</FormLabel>
                        <FormControl fullWidth>
                          <Select
                            className="select"
                            options={[
                              { value: 'regina_george', label: 'Regina George' },
                              { value: 'augustus', label: 'Augustus' },
                              { value: 'selena_gomez', label: 'Selena Gomez' },
                              { value: 'augustus', label: 'Augustus' },
                            ]}
                            value="regina_george"
                            placeholder="Select your data source"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <FormLabel className="label">PCC/OID/ACCESS CREDS</FormLabel>
                        <FormControl fullWidth>
                          <TextField type="credentials" placeholder="Your credentials" variant="outlined" />
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
              )}
            </Grid>
          </Drawer.Body>
        </PerfectScrollbar>
        <Drawer.Footer className="edit-form-buttons">
          <Button
            variant="outlined"
            className="btn-primary"
            onClick={() => setDrawerOpened(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="btn-filled"
            onClick={() => setDrawerOpened(false)}
          >
            Save
          </Button>
        </Drawer.Footer>
      </Drawer>
    </>
  )
};

export default AgencyAddModal;
