import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface ProblemReport {
    id: bigint;
    reporterName: string;
    problemType: ProblemType;
    reporterContact: string;
    locationDescription: string;
    timestamp: Time;
    detailedDescription: string;
}
export interface Event {
    id: bigint;
    title: string;
    date: Time;
    description: string;
}
export interface Message {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface UserProfile {
    name: string;
}
export enum ProblemType {
    other = "other",
    waterSewer = "waterSewer",
    roadDamage = "roadDamage",
    pothole = "pothole",
    streetlight = "streetlight"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addEvent(title: string, date: Time, description: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteEvent(id: bigint): Promise<void>;
    deleteReport(id: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getEvents(): Promise<Array<Event>>;
    getMessages(): Promise<Array<Message>>;
    getReports(): Promise<Array<ProblemReport>>;
    getTownAddress(): Promise<string>;
    getTownPhoneNumber(): Promise<string>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitMessage(name: string, email: string, message: string): Promise<void>;
    submitProblemReport(problemType: ProblemType, locationDescription: string, detailedDescription: string, reporterName: string, reporterContact: string): Promise<bigint>;
}
