import { ApolloError } from '@apollo/client';
import { ValidationError } from '@src/types';

/**
 * Returns message from validation error
 *
 * @param {any[]} errors
 * @param {string} prop
 * @returns {string|undefined}
 */
export const getValidationErrorMessage = (errors: ValidationError[], prop: string): string | undefined => {
    const props = prop.split('.');
    const err = props.reduce<ValidationError[]>((errors: ValidationError[], value: string) => value === props[props.length - 1] ? errors : errors.find(({ property }) => property === value)?.children || [], errors).find(({ property }) => property === props[props.length - 1]);
    return err?.constraints[Object.keys(err?.constraints)[0]];
};

/**
 * Returns validation errors
 *
 * @param {ApolloError} err
 * @returns {ValidationError[]}
 */
export const parseErrors = (err: ApolloError): ValidationError[] => {
    return err.graphQLErrors.reduce((messages: ValidationError[], error: any) => [
        ...messages,
        ...error.extensions.originalError.message
    ], []);
};

/**
 * Returns absolute path of file
 *
 * @param {string} path
 * @param {string|undefined} baseUrl
 * @returns {string}
 */
export const absolutePath = (path: string, modification: string = '', baseUrl: string = import.meta.env.VITE_CDN_URL): string => {
    const paths = import.meta.env.DEV ? [baseUrl, path] : [baseUrl, modification, path];
    return paths.join('/');
};
