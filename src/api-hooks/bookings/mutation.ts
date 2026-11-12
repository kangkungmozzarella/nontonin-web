import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiError, mockServer } from 'common/api/mock/server';
import { queryClient } from 'common/api/query-client';
import { seatKey } from 'api-hooks/seats/query';
import { BookingModel, CreateBookingInput } from './model';

export function useCreateBooking(
  options?: UseMutationOptions<BookingModel, ApiError, CreateBookingInput>,
) {
  return useMutation(
    async (input: CreateBookingInput) => mockServer.createBooking(input),
    {
      onSettled(_data, _error, input) {
        queryClient.invalidateQueries(seatKey.map(input.showtimeId));
      },
      ...options,
    },
  );
}
