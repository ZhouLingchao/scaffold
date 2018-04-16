import moment from 'moment';
import { exportTemplate } from '../services/export';
import { checkResponses } from '../utils/request';

export default {
  namespace: 'export',

  effects: {
    *xlsx({ required, payload }, { call }) {
      const response = yield call(exportTemplate, required, payload);
      checkResponses(response, () => {
        const a = document.createElement('a');
        a.href = `${APIURL}/api/DownloadExcels?fileGuid=${response.fileGuid}&fileName=${response.fileName}`; //eslint-disable-line
        a.download = `${required.filename}-${moment(new Date()).format('YYYYMMDDHHmmss')}.xlsx`;
        a.click();
      });
    },
  },
};
