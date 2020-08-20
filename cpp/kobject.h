struct kobject {
    const char              *name;
    //struct list_head        entry;
    struct kobject          *parent;
    //struct kset             *kset;
    //struct kobj_type        *ktype;
    struct sysfs_dirent     *sd;
    //struct kref             kref;
    //unsigned int state_initialized:1;
    //unsigned int state_in_sysfs:1;
    //unsigned int state_add_uevent_sent:1;
    //unsigned int state_remove_uevent_sent:1;
    //unsigned int uevent_suppress:1;
};