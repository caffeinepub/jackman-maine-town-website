import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Event and Announcement Management
  type Event = {
    id : Nat;
    title : Text;
    date : Time.Time;
    description : Text;
  };

  var nextEventId : Nat = 0;
  let eventsList = List.empty<Event>();

  public shared ({ caller }) func addEvent(title : Text, date : Time.Time, description : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add events");
    };
    let event : Event = {
      id = nextEventId;
      title;
      date;
      description;
    };
    eventsList.add(event);
    nextEventId += 1;
  };

  public shared ({ caller }) func deleteEvent(id : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete events");
    };
    let filteredArray = eventsList.toArray().filter(func(e) { e.id != id });
    eventsList.clear();
    for (event in filteredArray.values()) {
      eventsList.add(event);
    };
  };

  public query func getEvents() : async [Event] {
    eventsList.toArray();
  };

  // Contact Form Management
  type Message = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let messages = List.empty<Message>();

  public shared func submitMessage(name : Text, email : Text, message : Text) : async () {
    let newMessage : Message = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    messages.add(newMessage);
  };

  public query ({ caller }) func getMessages() : async [Message] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view messages");
    };
    messages.toArray();
  };

  // Resident Problem Reports
  public type ProblemType = {
    #pothole;
    #streetlight;
    #waterSewer;
    #roadDamage;
    #other;
  };

  public type ProblemReport = {
    id : Nat;
    problemType : ProblemType;
    locationDescription : Text;
    detailedDescription : Text;
    reporterName : Text;
    reporterContact : Text;
    timestamp : Time.Time;
  };

  var nextReportId : Nat = 0;
  let reportsList = List.empty<ProblemReport>();

  public shared ({ caller }) func submitProblemReport(problemType : ProblemType, locationDescription : Text, detailedDescription : Text, reporterName : Text, reporterContact : Text) : async Nat {
    let report : ProblemReport = {
      id = nextReportId;
      problemType;
      locationDescription;
      detailedDescription;
      reporterName;
      reporterContact;
      timestamp = Time.now();
    };
    reportsList.add(report);
    nextReportId += 1;
    report.id;
  };

  public query ({ caller }) func getReports() : async [ProblemReport] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view reports");
    };
    reportsList.toArray();
  };

  public shared ({ caller }) func deleteReport(id : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete reports");
    };
    let filteredArray = reportsList.toArray().filter(func(r) { r.id != id });
    reportsList.clear();
    for (report in filteredArray.values()) {
      reportsList.add(report);
    };
  };

  public shared query func getTownAddress() : async Text {
    "123 Main Street, Jackman, ME 04945";
  };

  public shared query func getTownPhoneNumber() : async Text {
    "(123) 456-7890";
  };
};
