import { Schema } from 'mongoose';

const toJSONPlugin = (schema: Schema) => {
    schema.set('toJSON', {
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    });

    schema.set('timestamps', true);
};

export { toJSONPlugin };
