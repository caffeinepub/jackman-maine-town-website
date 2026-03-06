import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Event, UserProfile, ProblemReport, ProblemType } from '../backend';

// ── Events ──────────────────────────────────────────────────────────────────

export function useGetEvents() {
  const { actor, isFetching } = useActor();

  return useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddEvent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, date, description }: { title: string; date: bigint; description: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addEvent(title, date, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

export function useDeleteEvent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteEvent(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

// ── Contact ──────────────────────────────────────────────────────────────────

export function useGetTownAddress() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['townAddress'],
    queryFn: async () => {
      if (!actor) return '';
      return actor.getTownAddress();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTownPhoneNumber() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['townPhone'],
    queryFn: async () => {
      if (!actor) return '';
      return actor.getTownPhoneNumber();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitMessage() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ name, email, message }: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitMessage(name, email, message);
    },
  });
}

// ── Auth / Profile ────────────────────────────────────────────────────────────

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

// ── Problem Reports ───────────────────────────────────────────────────────────

export function useSubmitProblemReport() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      problemType,
      locationDescription,
      detailedDescription,
      reporterName,
      reporterContact,
    }: {
      problemType: ProblemType;
      locationDescription: string;
      detailedDescription: string;
      reporterName: string;
      reporterContact: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitProblemReport(
        problemType,
        locationDescription,
        detailedDescription,
        reporterName,
        reporterContact
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['problemReports'] });
    },
  });
}

export function useGetProblemReports(isAdmin: boolean) {
  const { actor, isFetching } = useActor();

  return useQuery<ProblemReport[]>({
    queryKey: ['problemReports'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReports();
    },
    enabled: !!actor && !isFetching && isAdmin,
  });
}

export function useDeleteProblemReport() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteReport(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['problemReports'] });
    },
  });
}
