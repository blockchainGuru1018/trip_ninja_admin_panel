import * as React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Button,
  TextField,
  Grid,
  FormLabel,
  FormControl,
} from '@material-ui/core';

import {Drawer, Select, Tabs, NameField} from '../../../components';

import PropTypes from "prop-types";
import {bindActionCreators, Dispatch} from "redux";
import {useState} from "react";
import {updateAgency} from "../../../store/agencies/actions";
import {connect} from "react-redux";
import {useEffect} from "react";
import {axios} from "../../../utils";

const propTypes = {
  opened: PropTypes.bool.isRequired,
  agency: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  updateAgency: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>

const AgencyEditDrawer: React.FC<Props> = ({opened, agency, onClose, updateAgency}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [suppliers, setSuppliers] = useState<{
    id: string | undefined,
    pcc: string
  }[]>([
    {id: undefined, pcc: ''}
  ]);
  const [agencyName, setAgencyName] = useState('');
  const [apiUserName, setApiUserName] = useState('');
  const [apiPassword, setApiPassword] = useState('');
  const [adminID, setAdminID] = useState(undefined);
  const [adminOptions, setAdminOptions] = useState([]);
  const [DataSourceOptions, setDataSourceOptions] = useState([]);

  useEffect(() => {
    if (opened) {
        axios.get(`/api/v1/users/list/agency/${agency.agency_id}/`).then(({ data }) => {
          setAdminOptions(data.data.users.map((el: any) => ({
            value: el.user_id,
            label: el.username,
          })))
        }).catch(console.error);
      axios.get(`/api/v1/teams/data_source/${agency.agency_id}/`).then(({data}) => {
        setDataSourceOptions(data.data.data_source.map((el: any) => ({
          value: el.id,
          label: el.provider,
        })))
      }).catch(console.error);
    }
  }, [opened, agency]);

  useEffect(() => {
    setAgencyName(agency ? agency.agency_name : '');
    setAdminID(agency ? agency.admin_id : '');
    setApiUserName(agency ? agency.api_username : '');
    setApiPassword(agency ? agency.api_password : '');
    setSuppliers(agency ? agency.data_source : []);
  }, [agency]);

  const onSave = () => {
    updateAgency({
      agency_id: agency.agency_id,
      admin_id: adminID,
      agency_name: agencyName,
      api_username: apiUserName,
      api_password: apiPassword,
      data_source: suppliers
    });
    onClose();
  };

  const addSupplier = () => {
    setSuppliers([
      ...suppliers,
      {id: undefined, pcc: ''}
    ])
  };

  const onChangeSupplier = (i: number, attr: 'id' | 'pcc', value: string) => {
    const s = [...suppliers];
    s[i][attr] = value;

    setSuppliers(s);
  };

  return (
    <>
      <Drawer
        className="agency-Accounts-Page-modal"
        opened={opened}
        onClose={onClose}
      >
        {agency && (
          <>
            <Drawer.Header>
              <NameField value={agencyName} onChange={(ev) => setAgencyName(ev.target.value)}/>
            </Drawer.Header>
            <PerfectScrollbar>
              <Drawer.Body>
                <Grid item xs={12}>
                  <Tabs
                    value={activeTab}
                    tabs={["API Credentials", "Data Sources"]}
                    onChange={(event: React.ChangeEvent<{}>, newValue: any) => setActiveTab(newValue)}
                    style={{marginBottom: 30}}
                  />
                  {activeTab === 0 ? (
                    <Grid container spacing={3} className="row">
                      <Grid item sm={6} xs={12}>
                        <FormLabel className="label">API Username</FormLabel>
                        <FormControl>
                          <TextField
                            placeholder="API Username"
                            value={apiUserName}
                            variant="outlined"
                            onChange={(ev) => setApiUserName(ev.target.value)}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <FormLabel className="label">API Password</FormLabel>
                        <FormControl>
                          <TextField
                            placeholder="API Password"
                            value={apiPassword}
                            variant="outlined"
                            onChange={(ev) => setApiPassword(ev.target.value)}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormLabel className="radio-label">Agency Admin</FormLabel>
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
                  ) : (
                    <div>
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
                          <Button size="small" color="secondary" className="btn-text" onClick={addSupplier}>+
                            Supplier</Button>
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
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="btn-filled"
                onClick={onSave}
              >
                Save
              </Button>
            </Drawer.Footer>
          </>
        )}
      </Drawer>
    </>
  )
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateAgency: bindActionCreators(updateAgency, dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(AgencyEditDrawer);
