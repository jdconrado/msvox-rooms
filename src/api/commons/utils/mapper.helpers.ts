import { forMember, mapFrom, MappingConfiguration } from '@automapper/core';
import { isUndefined } from 'lodash';
import { DateTime } from 'luxon';

export function mapISOStringToDate<TSource, TDestination>(
  destProp: Extract<keyof TDestination, string>,
  srcProp?: Extract<keyof TSource, string>,
): MappingConfiguration<TSource, TDestination> {
  if (!srcProp) {
    srcProp = <never>destProp;
  }

  return forMember(
    (dest) => <never>dest[<keyof typeof dest>destProp],
    mapFrom((src) => {
      const srcDate = src[<keyof typeof src>srcProp];
      const date = !isUndefined(srcDate)
        ? DateTime.fromISO(<never>srcDate)
        : undefined;

      return date && date.isValid ? date.toJSDate() : undefined;
    }),
  );
}

export function mapDateToISOString<TSource, TDestination>(
  destProp: Extract<keyof TDestination, string>,
  srcProp?: Extract<keyof TSource, string>,
): MappingConfiguration<TSource, TDestination> {
  if (!srcProp) {
    srcProp = <never>destProp;
  }

  return forMember(
    (dest) => <never>dest[<keyof typeof dest>destProp],
    mapFrom((src) => {
      const srcDate = src[<keyof typeof src>srcProp];

      return !isUndefined(srcDate)
        ? DateTime.fromJSDate(<never>srcDate).toISODate()
        : undefined;
    }),
  );
}
