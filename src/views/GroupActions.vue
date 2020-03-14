<template>
  <v-card id="lateral">
      <v-card-title>{{ this.$route.params.id}}</v-card-title>
      <!-- <v-spacer></v-spacer> -->
        <v-tabs color="deep-purple accent-3"  centered>
          <v-tab >Alumnos</v-tab>
          <v-tab >Tareas</v-tab>
          <v-tab >Examenes</v-tab>
     
        <v-tab-item >
          <v-card height="70vh" flat>
              <v-row justify="center">
                  <v-col>
                      <v-list>
                          <v-row justify="center">

                          <v-list-item v-for="(student, index) in students" :key="index" >
                              <v-list-content>
                                  <v-list-title>
                                      {{ student.name}}
                                  </v-list-title>
                              </v-list-content>
                          </v-list-item>
                          </v-row>
                      </v-list>
                  </v-col>
              </v-row>
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on }">
                <v-fab-transition>
                  <v-btn
                    key="mdi-"
                    color="deep-purple accent-3"
                    fab
                    large
                    dark
                    v-on="on"
                    bottom
                    left
                    class="v-btn--example"
                  >
                    <v-icon>{{ activeFab.icon }}</v-icon>
                  </v-btn>
                </v-fab-transition>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>Crear Alumno</v-card-title>
                <v-container>
                  <v-card-text>
                    <v-text-field label="Nombre" v-model="student_name"></v-text-field>
                  </v-card-text>
                </v-container>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="createStudent">guardar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-tab-item>
        <v-tab-item>
            <h1>tab 2</h1>
        </v-tab-item>
              </v-tabs>

  </v-card>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";
export default {
  data: () => ({
      students:[],
    student_name: null,
    dialog: false,
    fab: false,
    hidden: false,
    tabs: null
  }),

  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { color: "success", icon: "share" };
        case "two":
          return { color: "red", icon: "edit" };
        case "three":
          return { color: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    }
  },
  created() {
    var GUID = "a-1";
var limit = 32;
var groupMemberRequest = new CometChat.GroupMembersRequestBuilder(GUID)
  .setLimit(limit)
  .build();

groupMemberRequest.fetchNext().then(
  groupMembers => {
      this.students = groupMembers
    console.log("Group Member list fetched successfully:", groupMembers);
  },
  error => {
    console.log("Group Member list fetching failed with exception:", error);
  }
);

  },
  mounted() {
    // var GUID = "a-1";
    // var groupName = "a-1";
    // var groupType = CometChat.GROUP_TYPE.PUBLIC;
    // var password = "";

    // var group = new CometChat.Group(GUID, groupName, groupType, password);

    // CometChat.createGroup(group).then(
    //   group => {
    //     console.log("Group created successfully:", group);
    //   },
    //   error => {
    //     console.log("Group creation failed with exception:", error);
    //   }
    // );
  },

  methods: {
    createStudent() {
      let GUID = "a-1";
      let membersList = [
        new CometChat.GroupMember(
          this.student_name,
          CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
        )
      ];

      CometChat.addMembersToGroup(GUID, membersList, []).then(
        response => {
          console.log("response", response);
          this.dialog = false;
              var GUID = "a-1";
var limit = 32;
var groupMemberRequest = new CometChat.GroupMembersRequestBuilder(GUID)
  .setLimit(limit)
  .build();

groupMemberRequest.fetchNext().then(
  groupMembers => {
      this.students = groupMembers
    console.log("Group Member list fetched successfully:", groupMembers);
  },
  error => {
    console.log("Group Member list fetching failed with exception:", error);
  }
);
        },
        error => {
          console.log("Something went wrong", error);
        }
      );
    }
  }
};
</script>

<style>
/* This is for documentation purposes and will not be needed in your application */
#lateral .v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
</style>