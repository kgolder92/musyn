const db = require('../../../../database');
const edits = require('../edits');
const compileEdits = require('./compile');

class Cache {
  static get() {
    const queryString = `
      SELECT edit_id, score FROM score_cache
      ORDER BY edit_id DESC
      LIMIT 1;
    `;

    return db.query(queryString)
      .then(([result]) => {
        let editId;
        let score;
        if (result) {
          editId = result.edit_id;
          score = result.score;
        } else {
          editId = 0;
          score = {};
        }

        return { editId, score };
      });
  }

  static async update(compositionId) {
    const lastCompiled = await this.get();

    const queryString = `
      INSERT INTO score_cache(composition_id, edit_id, score)
      VALUES ($1, $2, $3);
    `;

    const buildEdits = await edits.getFrom(compositionId, lastCompiled.editId + 1);

    const { editId, score } = compileEdits(lastCompiled.score, buildEdits);
    return db.query(queryString, [compositionId, editId, score]);
  }

  static undo() {
    const queryString = `
      DELETE FROM score_cache WHERE edit_id in (
        SELECT edit_id
        FROM score_cache
        ORDER BY edit_id DESC
        LIMIT 1
      );
    `;

    return db.query(queryString);
  }
}

module.exports = Cache;
