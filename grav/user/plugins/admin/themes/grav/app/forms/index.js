import FormState, { Instance as FormStateInstance } from './state';
import Form, { Instance as FormInstance } from './form';

import Fields from './fields';

export default {
    Form: {
        Form,
        Instance: FormInstance
    },
    Fields,
    FormState: {
        FormState,
        Instance: FormStateInstance
    }
};
