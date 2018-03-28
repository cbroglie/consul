import Controller from '@ember/controller';
import { get } from '@ember/object';
import { computed } from '@ember/object';
import sumOfUnhealthy from 'consul-ui/utils/sumOfUnhealthy';
import hasStatus from 'consul-ui/utils/hasStatus';
import WithHealthFiltering from 'consul-ui/mixins/with-health-filtering';
export default Controller.extend(WithHealthFiltering, {
  columns: [25, 25, 25, 25],
  unhealthy: computed('filtered', function() {
    return this.get('filtered').filter(function(item) {
      return sumOfUnhealthy(item.Checks) > 0;
    });
  }),
  healthy: computed('filtered', function() {
    return this.get('filtered').filter(function(item) {
      return sumOfUnhealthy(item.Checks) === 0;
    });
  }),
  filter: function(item, { s = '', status = '' }) {
    return (
      get(item, 'Node.Node')
        .toLowerCase()
        .indexOf(s.toLowerCase()) === 0 && hasStatus(get(item, 'Checks'), status)
    );
  },
});
